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
const getUserPreferences = async (req, res) => {
  try {
    const { userId } = await req.params;
    const userPreferences = await prisma.userPreferences.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        preferences: true,
      },
    });

    if (!userPreferences && userPreferences.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User preferences not found",
      });
    }

    // send the preferences in response
    res.status(200).json({
      success: true,
      message: "User preferences retrieved successfully",
      data: userPreferenes,
    });
  } catch (error) {
    console.error("Error while Fetching UserPreferences", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching user preferences",
      error: error.message,
    });
  }
};

const updateUserPreferences = async (req, res) => {
  try {
    const { userId } = req.params;
    const { preferences } = req.body;

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

    // Prepare the data or update
    const updateData = preferences.map((preferenceId) => ({
      where: {
        user_id_preferences_id: {
          user_id: userId,
          preferences_id: preferenceId,
        },
      },
      data: {
        preferences_id: preferenceId,
      },
    }));

    // Update the preferences to model
    const updatedUserPreferences = await prisma.userPreferences.updateMany({
      where: {
        user_id: userId,
      },
      data: updateData,
    });

    if (!updateUserPreferences && updateUserPreferences.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User preferences not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User preferences updated successfully",
      data: updateUserPreferences,
    });
  } catch (error) {
    console.error("Error while Updating UserPreferences", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating user preferences",
      error: error.message,
    });
  }
};

export default {
  getUserProfile,
  updateUserProfile,
  getUserPreferences,
  updateUserPreferences,
};
