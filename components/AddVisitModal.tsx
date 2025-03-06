import { FC, ReactNode } from "react";
import {
  Modal,
  ModalProps,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import AppButton from "./AppButton";

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
          <TextInput placeholder="Notes" style={styles.input} multiline />
          <TextInput placeholder="Date" style={styles.input} />
          <AppButton onPress={handleClose} title={"Submit"} style={styles.submit} titleStyle={styles.submitTitle}/>
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
    borderWidth: 1,
    elevation: 10,
    borderColor: "#1E90FF",
    shadowColor: "#1E90FF",
    backgroundColor: "white",
    justifyContent: "space-between",
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
  submit: {
    alignSelf: 'flex-end',
    backgroundColor: '#1E90FF',
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 8
  },
  submitTitle: {
    color: 'white',
  }
});
