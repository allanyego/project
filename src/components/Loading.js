export default function Loading({ text }) {
  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center">
      <div id="spinner"></div>
      {text && <div>{text}</div>}
    </div>
  );
}
