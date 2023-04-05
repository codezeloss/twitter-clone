import EditableImage from "./EditableImage";

const Cover = ({ src, onChange, editable }) => {
  return (
    <EditableImage
      type={"cover"}
      src={src}
      onChange={onChange}
      editable={editable}
      className={"h-36"}
    />
  );
};

export default Cover;
