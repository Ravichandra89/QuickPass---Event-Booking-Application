import prisma from "../config/prismaClient";

// GetUser Profile
const getUserProfile = async (req, res) => {
  try {
    // Get userId from params
    const { userId } = await req.params;

    // Fetch the Profile
    const userProfile = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send Profile in response
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: userProfile,
    });
  } catch (error) {
    console.error("Error while Fetching User Profile", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching user profile",
      error: error.message,
    });
  }
};

// Update User Profile
const updateUserProfil = async (req, res) => {
  try {
    // Get userId from params
    const { userId } = await req.params;
    const { firstName, lastName, email, paymentInfo } = await req.body;

    // Fetch the user for updating their profile
    const user = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update the profile by required fields
    const updateData = {};

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;

    if (paymentInfo) {
      updateData.paymentInfo = {
        update: paymentInfo,
      };
    }

    const updatedProfile = await prisma.user.update({
      where: {
        user_id: userId,
      },
      data: updateData,
    });

    if (!updatedProfile) {
      return res.status(500).json({
        success: false,
        message: "Failed to update user profile",
      });
    }

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Error while updating user profile", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating user profile",
      error: error.message,
    });
  }
};

// User Preference GET Request
const getUserPreferences = async (req, res) => {};

const updateUserPreferences = async (req, res) => {};

export default {
  getUserProfile,
  updateUserProfile,
  getUserPreferences,
  updateUserPreferences,
};
