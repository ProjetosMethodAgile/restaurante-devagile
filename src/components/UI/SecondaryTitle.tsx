type SecondaryTitleProps = {
  title: string;
};

export default function SecondaryTitle({ title }: SecondaryTitleProps) {
  return <h1 className="text-1xl font-semibold  text-secondary">{title}</h1>;
}
