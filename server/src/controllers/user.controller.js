import prisma from "../config/prisma.js";

// GetUser Profile
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`Fetching profile for userId: ${userId}`);

    // Fetch user profile from the database
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

    // Log the user profile data
    console.log("User Profile Data:", userProfile);

    // Respond with the user profile data
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
const updateUserProfile = async (req, res) => {
  try {
    // Get userId from params
    const { userId } = await req.params;
    const { first_name, last_name, email, paymentInfo } = await req.body;

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

    if (first_name) updateData.first_name = first_name;
    if (last_name) updateData.last_name = last_name;
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
    const { userId } = req.params;
    console.log(`Fetching preferences for userId: ${userId}`);

    // Fetch the user preferences using user_id with findMany
    const userPreferences = await prisma.userPreferences.findMany({
      where: {
        user_id: userId, // Find preferences by user_id
      },
      include: {
        preference: true, // Include the preference data
      },
    });

    if (userPreferences.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User preferences not found",
      });
    }

    // Respond with the user preferences data
    res.status(200).json({
      success: true,
      message: "User preferences fetched successfully",
      data: userPreferences,
    });
  } catch (error) {
    console.error("Error while Fetching User Preferences", error);
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
    const { preferences } = req.body; // Array of preference IDs to be updated

    // Fetch the user by userId
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

    // Loop through the preferences array and update each user preference
    const updatePromises = preferences.map((preferenceId) => {
      return prisma.userPreferences.upsert({
        where: {
          user_id_preferences_id: {
            user_id: userId,
            preferences_id: preferenceId, // Use the composite key
          },
        },
        create: {
          user_id: userId,
          preferences_id: preferenceId,
        },
        update: {
          preferences_id: preferenceId, // Update the preferences_id
        },
      });
    });

    // Wait for all updates to finish
    const updatedPreferences = await Promise.all(updatePromises);

    res.status(200).json({
      success: true,
      message: "User preferences updated successfully",
      data: updatedPreferences,
    });
  } catch (error) {
    console.error("Error while updating preferences:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating user preferences",
      error: error.message,
    });
  }
};

const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
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

    const notificationFetch = await prisma.notifications.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (!notificationFetch || notificationFetch.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No notifications found for user",
      });
    }

    res.status(200).json({
      success: true,
      message: "User notifications fetched successfully",
      data: notificationFetch,
    });
  } catch (error) {
    console.error("Error Fetching User Notification", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching user notifications",
      error: error.message,
    });
  }
};

export {
  getUserProfile,
  updateUserProfile,
  getUserPreferences,
  updateUserPreferences,
  getUserNotifications,
};
