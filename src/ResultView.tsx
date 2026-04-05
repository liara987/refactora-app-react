/**
 * Starter view: wired to `data` in mockData—payloads are intentionally inconsistent;
 * many cases unhandled here.
 */
export default function ResultView({ data }: any) {
  return (
    <div>
      <h1>{data?.title}</h1>
      {data?.sections.map((s: any, i: number) => {
        if (s.type === "text") {
          return <p key={i}>{s.content}</p>;
        }
        if (s.type === "list") {
          return (
            <ul key={i}>
              {s.items.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          );
        }
        if (s.type === "highlight") {
          return <strong key={i}>{s.content}</strong>;
        }
        return <div key={i}>Unknown section</div>;
      })}
    </div>
  );
}
