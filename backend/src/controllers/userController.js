import mongoose from "mongoose";
import FriendRequest from "../model/friendReq.js";
import User from "../model/User.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUserDoc = await User.findById(currentUserId).select("friend");

    const recommendedUsers = await User.find({
      _id: { $ne: currentUserId, $nin: currentUserDoc.friend },
      isOnboarded: true,
    });

    res.json({
      recommendedUsers,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: `Failed to fetch recommended users: ${e}` });
  }
}

export async function getMyFriends(req, res) {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate(
      "friend",
      "fullName profilePic nativeLanguage learningLanguage location"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      friends: user.friend,
    });
  } catch (e) {
    res.status(500).json({ message: `Failed to fetch friends: ${e.message}` });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You can't send a request to yourself." });
    }

    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found." });
    }

    if (recipient.friend.includes(myId)) {
      return res.status(400).json({ message: "You are already friends." });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Friend request already exists.",
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.json({
      friendRequest: friendRequest,
    });
  } catch (e) {
    res.status(500).json({ message: `Failed to send friend request: ${e}` });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({
        message: "Friend request not found",
      });
    }

    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to accept this request.",
      });
    }
    friendRequest.status = "accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friend: friendRequest.sender },
    });

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friend: friendRequest.recipient },
    });
    res.json({
      message: "Friend request accepted.",
    });
  } catch (e) {
    res.status(500).json({
      message: `Failed to accept friend request: ${e}`,
    });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage "
    );

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.json({
      incomingReqs,
      acceptedReqs,
    });
  } catch (e) {
    res.status(500).json({
      message: `Failed to fetch friend requests: ${e}`,
    });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );
    res.json({
      outgoingRequests,
    });
  } catch (e) {
    res.status(500).json({
      message: `Failed to fetch outgoing friend requests: ${e}`,
    });
  }
}