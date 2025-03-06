import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pet, BodyConditionLog, WeightLog, LogType } from '../../types';
import TabNavigator from '@/components/profiles/TabNavigator';
import {getThisMonthLogs} from '@/utils';
import WeightLogsTab from '@/components/profiles/tabs/WeightLogsTab';
import BodyConditionTab from '@/components/profiles/tabs/BodyConditionTab';
import VetVisitsTab from '@/components/profiles/tabs/VetVisitsTab';
import PetCard from '@/components/profiles/sections/PetCard';
import LogsTable from '@/components/profiles/sections/LogsTable';
import HealthStatus from '@/components/profiles/sections/HealthStatus';

type RootStackParamList = {
  SingleProfile: { id: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'SingleProfile'>;

// Mock data for development
const mockPet: Pet = {
  id: '1',
  name: 'Max',
  species: 'Dog',
  breed: 'Golden Retriever',
  age: 3,
  created_at: new Date().toISOString(),
  owner_id: '123',
  logs_weight: [
    { id: '1', pet_id: '1', weight: 25.5, date: '2024-02-25T10:00:00Z' },
    { id: '2', pet_id: '1', weight: 26.0, date: '2024-01-25T10:00:00Z' },
  ],
  logs_bodycondition: [
    { id: '1', pet_id: '1', body_condition: "3", date: '2024-02-25T10:00:00Z' },
    { id: '2', pet_id: '1', body_condition: "4", date: '2024-01-25T10:00:00Z' },
  ],
  logs_vet_visits: [
    { id: '1', pet_id: '1', notes: "the dog condition is perfect", date: '2024-01-25T10:00:00Z' },
    { id: '2', pet_id: '1', notes: "needs skin care for itching", date: '2024-02-25T10:00:00Z' }
  ],
};

export const SingleProfileScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<LogType>('weight');
  const { height } = useWindowDimensions();
  const [thisMonthLogs, setThisMonthLogs] = useState<{
    latestBodyConditionLog: BodyConditionLog | null;
    latestWeightLog: WeightLog | null;
  }>({
    latestBodyConditionLog: null,
    latestWeightLog: null,
  });
  const TABS: Record<LogType, JSX.Element> = {
    weight: <WeightLogsTab weightLogs={pet?.logs_weight || []}/>,
    body: <BodyConditionTab bodyConditionLogs={pet?.logs_bodycondition || []}/>,
    vet: <VetVisitsTab pet={pet}  setPet={setPet}/>,
  };

  useEffect(() => {
    const fetchPet = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPet(mockPet);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  useEffect(() => {
    if (pet) {
      setThisMonthLogs(getThisMonthLogs(pet.logs_bodycondition, pet.logs_weight));
    }
  }, [pet]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>Pet not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <PetCard pet={pet} />
      
      <View style={styles.monthSummary}>
        <Text style={styles.tableHeader}>This Month's Summary</Text>
        <Text>
          Latest Weight: {thisMonthLogs.latestWeightLog?.weight || 'No data'} kg
        </Text>
        <Text>
          Body Condition: {thisMonthLogs.latestBodyConditionLog?.body_condition || 'No data'}
        </Text>
      </View>

      <HealthStatus pet={pet} />
      
      <LogsTable 
        weightLogs={pet.logs_weight} 
        bodyConditionLogs={pet.logs_bodycondition} 
      />

      <TabNavigator activeTab={activeTab} setActiveTab={setActiveTab}/>
      <View style={{minHeight: height * 0.65}}>
        {/* add error handling here */}
        {TABS[activeTab] || null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthSummary: {
    padding: 16,
    backgroundColor: '#e6f3ff',
    borderRadius: 8,
    marginBottom: 16,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

}); 