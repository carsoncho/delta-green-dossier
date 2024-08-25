export default function GroupHeader(props: { heading: string }) {
  return (
    <div className="group-header w-full p-1 bg-white text-black text-center text-sm">
      <p>{props.heading}</p>
    </div>
  );
}
