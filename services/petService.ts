import { Pet } from '../types';
import { supabase, handleSupabaseRequest } from './supabaseClient';

// Mock data for development
// const mockPets: Pet[] = [
//   {
//     id: '1',
//     name: 'Max',
//     species: 'Dog',
//     breed: 'Golden Retriever',
//     age: 3,
//     created_at: new Date().toISOString(),
//     owner_id: '123',
//     logs_weight: [],
//     logs_bodycondition: [],
//     logs_vet_visits: null
//   },
//   {
//     id: '2',
//     name: 'Luna',
//     species: 'Cat',
//     breed: 'Siamese',
//     age: 2,
//     created_at: new Date().toISOString(),
//     owner_id: '123',
//     logs_weight: [],
//     logs_bodycondition: [],
//     logs_vet_visits: null
//   }
// ];

const petFields = ['name', 'species', 'breed', 'age', 'owner_id'];

export const petService = {
  async getPets(): Promise<Pet[]> {
    return await handleSupabaseRequest(supabase.from('pets').select('*'));
  },

  async getPetById(id: string): Promise<Pet | null> {
    const pet = await handleSupabaseRequest(supabase
      .from('pets')
      .select(`
        *,
        logs_weight:weight_logs (*),
        logs_bodycondition:body_condition_logs (*),
        logs_vet_visits:vet_visit_logs (*)
      `)
      .eq('id', id)
      .single());
    return pet;
  },

  async createPet(pet: Omit<Pet, 'id' | 'created_at'>): Promise<Pet> {
    return await handleSupabaseRequest(supabase.from('pets').insert(pet));
  },

  async updatePet(id: string, updates: Partial<Pet>): Promise<Pet> {
    const petUpdates: Partial<Pet> = {};
    for (const key of petFields) {
      if (key in updates) {
        petUpdates[key as keyof Pet] = updates[key as keyof Pet];
      }
    }

    if (Object.keys(petUpdates).length > 0) {
      await handleSupabaseRequest(supabase
        .from('pets')
        .update(petUpdates)
        .eq('id', id))
    }

    if (updates.logs_vet_visits) {
      const vetVisits = updates.logs_vet_visits.map((log) => ({
        pet_id: id,
        notes: log.notes,
        date: log.date,
      }));

      await handleSupabaseRequest(supabase
        .from('vet_visit_logs')
        .insert(vetVisits))
    }

    if (updates.logs_weight) {
      const weightLogs = updates.logs_weight.map((log) => ({
        pet_id: id,
        weight: log.weight,
        date: log.date,
      }));
      const { error: weightError } = await supabase
        .from('weight_logs')
        .insert(weightLogs);

      if (weightError) {
        throw new Error(`Failed to insert weight logs: ${weightError.message}`);
      }
    }

    if (updates.logs_bodycondition) {
      const bodyConditionLogs = updates.logs_bodycondition.map((log) => ({
        pet_id: id,
        body_condition: log.body_condition,
        date: log.date,
      }));
      const { error: bodyError } = await supabase
        .from('body_condition_logs')
        .insert(bodyConditionLogs);

      if (bodyError) {
        throw new Error(`Failed to insert body condition logs: ${bodyError.message}`);
      }
    }

    const updatedPet = await this.getPetById(id);
    return updatedPet!;
  },

  async deletePet(id: string): Promise<void> {
    return await handleSupabaseRequest(supabase.from('pets').delete().eq('id', id));
  }
}; 