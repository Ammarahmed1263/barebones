import EmptyList from "@/components/EmptyList";
import HealthStatus from "@/components/profiles/sections/HealthStatus";
import LogsTable from "@/components/profiles/sections/LogsTable";
import MonthSummary from "@/components/profiles/sections/MonthSummary";
import PetCard from "@/components/profiles/sections/PetCard";
import TabNavigator from "@/components/profiles/TabNavigator";
import BodyConditionTab from "@/components/profiles/tabs/BodyConditionTab";
import VetVisitsTab from "@/components/profiles/tabs/VetVisitsTab";
import WeightLogsTab from "@/components/profiles/tabs/WeightLogsTab";
import { petService } from "@/services/petService";
import { getThisMonthLogs } from "@/utils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { LogType, MonthSummaryLogs, Pet } from "../../types";

type RootStackParamList = {
  SingleProfile: { id: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "SingleProfile">;

// Mock data for development
// const mockPet: Pet = {
//   id: "1",
//   name: "Max",
//   species: "Dog",
//   breed: "Golden Retriever",
//   age: 3,
//   created_at: new Date().toISOString(),
//   owner_id: "123",
//   logs_weight: [
//     { id: "1", pet_id: "1", weight: 25.5, date: "2024-02-25T10:00:00Z" },
//     { id: "2", pet_id: "1", weight: 26.0, date: "2024-01-25T10:00:00Z" },
//   ],
//   logs_bodycondition: [
//     { id: "1", pet_id: "1", body_condition: "3", date: "2024-02-25T10:00:00Z" },
//     { id: "2", pet_id: "1", body_condition: "4", date: "2024-01-25T10:00:00Z" },
//   ],
//   logs_vet_visits: [
//     {
//       id: "1",
//       pet_id: "1",
//       notes: "the dog condition is perfect",
//       date: "2024-02-25T10:00:00Z",
//     },
//     {
//       id: "2",
//       pet_id: "1",
//       notes: "needs skin care for itching",
//       date: "2024-01-25T10:00:00Z",
//     },
//   ],
// };

export const SingleProfileScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<LogType>("weight");
  const [thisMonthLogs, setThisMonthLogs] = useState<MonthSummaryLogs>({
    latestBodyConditionLog: null,
    latestWeightLog: null,
  });

  const TABS: Record<LogType, JSX.Element> = {
    weight: <WeightLogsTab weightLogs={pet?.logs_weight || []} />,
    body: (
      <BodyConditionTab bodyConditionLogs={pet?.logs_bodycondition || []} />
    ),
    vet: <VetVisitsTab pet={pet} setPet={setPet} />,
  };

  useEffect(() => {
    (async () => {
      try {
        const pet = await petService.getPetById(id);
        setPet(pet);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (pet) {
      setThisMonthLogs(
        getThisMonthLogs(pet.logs_bodycondition, pet.logs_weight)
      );
    }
  }, [pet]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size={"large"} />;
  }

  if (!pet) {
    return <EmptyList text="Sorry...couldn't find your pet" />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <PetCard pet={pet} />

      <MonthSummary monthLogs={thisMonthLogs} />

      <HealthStatus pet={pet} />

      <LogsTable
        weightLogs={pet.logs_weight}
        bodyConditionLogs={pet.logs_bodycondition}
      />

      <TabNavigator activeTab={activeTab} setActiveTab={setActiveTab} />
      {TABS[activeTab] || null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
