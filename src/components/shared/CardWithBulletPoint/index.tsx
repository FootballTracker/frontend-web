interface ICardWithBulletPoint {
  title: string;
  text: string | number;
}

export default function CardWithBulletPoint({
  title,
  text,
}: ICardWithBulletPoint) {
  return (
    <div className="pl-6 pr-3 py-2 flex gap-2 border border-red rounded-xl text-2xl min-w-[350px]">
      <span style={{ display: "inline-flex", alignItems: "center" }}>
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#933038",
            marginRight: 8,
          }}
        />
        <span>
          {title}: {text}
        </span>
      </span>
    </div>
  );
}
