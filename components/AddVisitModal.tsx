import { FC, ReactNode, useState } from "react";
import {
  ActivityIndicator,
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
import AppButton from "./AppButton";
import AppIcon from "./AppIcon";
import { useDebounce } from "@/hooks/useDebounce";

interface AddVisitModalProps extends ModalProps {
  visible: boolean;
  handleClose: () => void;
  viewStyle?: ViewStyle;
}

const AddVisitModal: FC<AddVisitModalProps> = ({
  visible,
  handleClose,
  viewStyle,
  ...props
}) => {
  const { width, height } = useWindowDimensions();
  const [notes, setNotes] = useDebounce("", 2000);
  const [date, setDate] = useDebounce("", 600);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      handleClose();
    }, 2000);
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
          <TextInput
            onChangeText={setDate}
            placeholder="Date"
            style={styles.input}
          />
          <AppIcon onPress={handleSubmit} pressableStyle={styles.submitPressable} style={[styles.submit, isSubmitting && styles.submitLoading]}>
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
      }
    })
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
    marginTop: 16
  },
  submitPressable: {
    paddingHorizontal: 20,
    paddingVertical: 10,  
  },
  submitTitle: {
    color: "white",
  },
  submitLoading: {
    backgroundColor: "#ccc",
  }
});
