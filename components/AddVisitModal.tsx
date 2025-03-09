import { useDebounce } from "@/hooks/useDebounce";
import { FC, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Modal,
  ModalProps,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import AppIcon from "./AppIcon";
import DatePicker from "@dietime/react-native-date-picker";
import { petService } from "@/services/petService";
import { bodyConditionMap, Pet } from "@/types";
import { Picker } from "@react-native-picker/picker";

interface AddVisitModalProps extends ModalProps {
  visible: boolean;
  pet: Pet | null;
  setPet: React.Dispatch<React.SetStateAction<Pet | null>>;
  handleClose: () => void;
  viewStyle?: ViewStyle;
}

const AddVisitModal: FC<AddVisitModalProps> = ({
  pet,
  setPet,
  visible,
  handleClose,
  viewStyle,
  ...props
}) => {
  const { width, height } = useWindowDimensions();
  const [notes, setNotes] = useDebounce("", 700);
  const [weight, setWeight] = useDebounce("", 700);
  const [date, setDate] = useState<Date>(new Date());
  const [bodyCondition, setBodyCondition] = useState<string>("1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(
    "is debouncing: ",
    notes,
    weight
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);
    Keyboard.dismiss();
    try {
      if (pet) {
        const updatedPet = await petService.updatePet(pet?.id, {
          logs_weight: [
            {
              weight,
              date: date.toISOString(),
              id: "",
              pet_id: pet.id,
            },
          ],
          logs_bodycondition: [
            {
              body_condition: bodyConditionMap[Number(bodyCondition)],
              date: date.toISOString(),
              id: "",
              pet_id: pet.id,
            },
          ],
          logs_vet_visits: [
            {
              notes,
              date: date.toISOString(),
              id: "",
              pet_id: pet.id,
            },
          ],
        });
        console.log("update pets: ", updatedPet);
        setPet(updatedPet);
      }
    } catch (error) {
      console.error("error adding new visit", error);
    } finally {
      setIsSubmitting(false);

      handleClose();
    }
  };

  const handleDismiss = () => {
    Keyboard.dismiss();
    setNotes("");
    setWeight("");
    handleClose();
  };

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={handleDismiss}
      {...props}
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={handleDismiss}>
          <View style={{ ...StyleSheet.absoluteFillObject }} />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.modalBody,
            {
              width: width * 0.9,
              minHeight: height * 0.3,
            },
            viewStyle,
          ]}
        >
          <Text style={styles.title}>Add new vet visits</Text>
          <TextInput
            onChangeText={setNotes}
            placeholder="Notes(required)"
            style={[styles.input, styles.notes]}
            multiline
            numberOfLines={4}
          />

          <View style={styles.weightContainer}>
            <TextInput
              onChangeText={setWeight}
              placeholder="weight(required)"
              keyboardType="numeric"
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
            />

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={bodyCondition}
                onValueChange={(itemValue) => setBodyCondition(itemValue)}
                mode="dropdown"
              >
                {Object.entries(bodyConditionMap).map(([label, value]) => (
                  <Picker.Item
                    key={label}
                    label={value + ` (${label})`}
                    value={label}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <DatePicker
            value={date}
            onChange={(value) => setDate(value)}
            format="dd-mm-yyyy"
            height={100}
            fontSize={14}
            markWidth={50}
            markHeight={30}
          />
          <AppIcon
            onPress={handleSubmit}
            pressableStyle={styles.submitPressable}
            style={[
              styles.submit,
              (isSubmitting || !notes.length || !weight.length) &&
                styles.submitInActive,
            ]}
            disabled={isSubmitting || !notes.length || !weight.length}
          >
            {!isSubmitting ? (
              <Text style={styles.submitTitle}>Submit</Text>
            ) : (
              <ActivityIndicator size="small" color="#1E90FF" />
            )}
          </AppIcon>
        </View>
      </View>
    </Modal>
  );
};

export default AddVisitModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(22, 21, 21, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1E90FF",
    shadowColor: "#1E90FF",
    backgroundColor: "white",
    justifyContent: "space-between",
    ...Platform.select({
      android: {
        elevation: 15,
      },
      ios: {
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
    }),
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  notes: {
    height: 100,
    textAlignVertical: "top",
  },
  submit: {
    width: 90,
    height: 40,
    alignSelf: "flex-end",
    backgroundColor: "#1E90FF",
    borderRadius: 4,
    marginTop: 16,
  },
  weightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
  },
  pickerContainer: {
    width: "70%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  submitPressable: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  submitTitle: {
    color: "white",
  },
  submitInActive: {
    backgroundColor: "#ccc",
  },
});
