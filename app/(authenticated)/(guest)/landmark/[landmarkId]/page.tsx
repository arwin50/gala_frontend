import LocationMap from "@/components/common/LocationMap";
import ViewMainDetails from "@/components/locations/ViewMainDetails";
import ViewNearbyLocations from "@/components/locations/ViewNearbyLocations";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import bgMetroManila from "@/assets/images/places_pic/places_metroManila.jpg";
import { sampleLandmarks } from "@/constants/landmark";
import { Landmark } from "@/interfaces/landmark";
import { useLocalSearchParams } from "expo-router";

export default function LandmarkView() {
  const { landmarkId } = useLocalSearchParams();
  const landmark: Landmark | undefined = sampleLandmarks.find(
    (landmark) => landmark.id === landmarkId
  );

  if (!landmark) {
    return <Text>{landmarkId} not found</Text>; // Handle the case when the landmark is not found
  }

  const marker = [
    {
      coordinate: {
        latitude: landmark.latitude,
        longitude: landmark.longitude,
      },
      title: landmark.name,
      description: landmark.location,
    },
  ];

  const region = {
    latitude: landmark.latitude,
    longitude: landmark.longitude,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <ViewMainDetails
          images={landmark.images}
          title={landmark.name}
          location={landmark.location}
          description={landmark.description}
          created_at={landmark.created_at}
        />

        <ViewNearbyLocations
          sectionTitle="Nearby Accommodations"
          locationType="accommodation"
          locations={landmark.nearbyAccommodations}
          defaultImage={bgMetroManila}
          onShowAll={() => console.log("Show all locations pressed!")}
        />

        <View className="mt-4 px-4">
          <Text className="text-lg font-bold">Location</Text>
          <LocationMap region={region} markers={marker} readOnly={false} />
        </View>

        <ViewNearbyLocations
          sectionTitle="Other Nearby Landmarks"
          locationType="landmark"
          locations={landmark.otherNearbyLandmarks}
          defaultImage={bgMetroManila}
          onShowAll={() => console.log("Show all locations pressed!")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
