function SaveButton({ onSave }) {
  return (
    <button onClick={onSave} style={{ display: "block", margin: "20px auto" }}>
      Save
    </button>
  );
}

export default SaveButton;
