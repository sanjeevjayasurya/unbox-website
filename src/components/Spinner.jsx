import SimpleLoader from "./loader/SimpleLoader";

const Spinner = () => (
  <div
    style={{
      minHeight: "60vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <SimpleLoader />
  </div>
);
export default Spinner;
