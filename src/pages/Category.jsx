import { useParams } from "react-router-dom";

export default function Category() {
  const { id } = useParams();
  return <div className="max-w-6xl mx-auto px-6 py-10">Category: {id}</div>;
}
