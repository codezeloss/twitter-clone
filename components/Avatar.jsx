import Image from "next/image";

const Avatar = ({ src }) => {
  return (
    <div className="rounded-full overflow-hidden w-12">
      <Image src={src} alt="Avatar" width="auto" height="auto" />
    </div>
  );
};

export default Avatar;
