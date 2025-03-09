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
import { Pet } from "@/types";

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
  const [date, setDate] = useState<Date>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    Keyboard.dismiss();
    try {
      if (pet) {
        console.log('date here: ', date.toLocaleDateString())
        const updatedPet = await petService.updatePet(pet?.id, {
          logs_vet_visits: [
            {
              notes,
              date: date.toISOString(),
              id: "",
              pet_id: pet.id,
            },
          ],
        });

        setPet(updatedPet);
      }
    } catch (error) {
      console.error("error adding new visit", error);
    } finally {
      setIsSubmitting(false);
      handleClose();
    }
  };

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={handleClose}
      {...props}
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={{ ...StyleSheet.absoluteFillObject }} />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.modalBody,
            {
              width: width * 0.9,
              maxHeight: height * 0.5,
              minHeight: height * 0.3,
            },
            viewStyle,
          ]}
        >
          <Text style={styles.title}>Add new vet visits</Text>
          <TextInput
            onChangeText={setNotes}
            placeholder="Notes"
            style={[styles.input, styles.notes]}
            multiline
            numberOfLines={4}
          />
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
              (isSubmitting || !notes.length) && styles.submitInActive,
            ]}
            disabled={isSubmitting || !notes.length}
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
