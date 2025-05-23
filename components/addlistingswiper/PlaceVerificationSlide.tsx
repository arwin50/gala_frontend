import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function PlaceVerificationSlide() {
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const handleScanID = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera and media library permissions to make this work."
      );
      return;
    }

    Alert.alert(
      "Choose Image Source",
      "Would you like to take a photo or select from the library?",
      [
        {
          text: "Take Photo",
          onPress: async () => {
            let result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              console.log(result.assets[0].uri);
              Alert.alert(
                "ID Scanned",
                "Photo taken successfully. URI: " + result.assets[0].uri
              );
              // TODO: Process the taken photo
            }
          },
        },
        {
          text: "Choose from Library",
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              console.log(result.assets[0].uri);
              Alert.alert(
                "ID Scanned",
                "Image selected successfully. URI: " + result.assets[0].uri
              );
              // TODO: Process the selected image
            }
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const handleCheckAllowedIDs = () => {
    console.log("Check allowed IDs link pressed");
    // TODO: Add navigation or modal to show allowed ID types
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 m-8 mt-0">
        <Text className="text-3xl font-extrabold">
          Verification and Contact
        </Text>
        <Text className="mt-2 text-description">
          To help build a safe and trusted community, we require users to verify
          their identity and contact details before they can host or book.
        </Text>
        <View className="mt-20">
          <Text className="text-xl font-medium mb-4">Verify your identity</Text>
          <Pressable
            onPress={handleScanID}
            className="flex-row items-center justify-center border border-gray-300 rounded-lg p-4 mb-2"
          >
            <Ionicons name="camera-outline" size={24} color="black" />
            <Text className="text-base ml-2">Scan your ID</Text>
          </Pressable>
          <Pressable onPress={handleCheckAllowedIDs} className="self-end mb-8">
            <Text className="text-blue-600 underline text-sm ">
              check allowed IDs here.
            </Text>
          </Pressable>

          {/* Contact Details */}
          <Text className="text-xl font-medium mb-4">Contact Details</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 mb-4"
            placeholder="Contact No."
            placeholderTextColor="#a1a1aa"
            keyboardType="phone-pad"
            value={contactNumber}
            onChangeText={setContactNumber}
          />
          <TextInput
            className="border border-gray-300 rounded-lg p-4"
            placeholder="Email address"
            placeholderTextColor="#a1a1aa"
            keyboardType="email-address"
            autoCapitalize="none"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
