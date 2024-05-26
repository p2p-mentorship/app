import Link from "next/link";

export default function mentors() {
  return (
    <section className="h-screen flex p-0 relative overflow-hidden flex-col w-full border-b border-b-[#111110]">
      <div className="flex justify-between absolute top-12 left-0 w-full border-b-[1px] border-b-[#111110] items-center px-12 py-2">
        <Link href="/home" className="text-3xl font-bold font-cabin text-[#111110]  flex items-center gap-x-2">
          <img src="/gb.png" className="w-10" />
          <h1>P2P Mentorship</h1>
        </Link>
        <div className="flex gap-x-8 text-xl font-cabin z-10">
          <h1>Issues</h1>
          <Link href="/mentors">Mentors</Link>
          <Link href="/map">Map</Link>
        </div>
      </div>
      <div className="h-full absolute top-0 w-[1px] bg-[#111110] left-8" />
      {/* <div className="h-1/2 absolute top-0 w-[1px] bg-[#111110] right-8" /> */}
      <div className="h-full absolute top-0 w-[1px] bg-[#111110] left-1/2" />
      <div className="w-full absolute top-1/2 h-[1px] bg-[#111110] left-0" />
      <div className="w-1/2 absolute bottom-10 h-[1px] bg-[#111110] left-1/2" />
      {/* <div className="h-1/2 absolute top-1/2 w-[1px] bg-[#111110] left-48 " /> */}
      <div className="overflow-hidden whitespace-nowrap py-1 bg-[#FFF348] border-b border-[#111110] z-10">
        <div className="inline-block animate-marquee">
          <p className="inline-block px-4 uppercase text-[#1f4b60] font-medium">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione,
            animi? Vero, fugiat porro at, ducimus dolorem optio quae totam
            magnam iusto ea nemo molestias quod delectus consequuntur inventore
            laborum quo.{" "}
          </p>
        </div>
      </div>
      <div className="flex mt-32 justify-between relative w-full">
        <div className="pl-12 w-1/3">
          <h1 className="text-3xl font-cabin font-bold ">Mentor List</h1>
          <div className="max-h-[50vh] overflow-scroll w-full scrollbar-primary mt-4 border border-black flex flex-col bg-white">
            {mentorsData.map((mentor, i) => (
              <div
                key={i}
                className="border-b border-b-black px-4 flex justify-between py-2 items-center hover:bg-[#fff348] duration-150 ease-in font-cabin tracking-wide"
              >
                <div className="flex flex-col justify-center">
                  <h1 className="text-lg font-medium">{mentor.name}</h1>
                  <p className="text-sm">{mentor.speciality}</p>
                </div>
                <div>
                  <img
                    src="https://static-00.iconduck.com/assets.00/telegram-icon-2048x2048-x902pktl.png"
                    className="w-8 rounded-full border border-black"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex py-8 flex-col justify-end  pr-16 pl-8 bg-white z-10 w-max border border-black">
          <h1 className="text-[#111110] text-6xl font-bold text-end font-cabin">
            Become a mentor
          </h1>
          <div className="pt-6 pb-6 rounded-2xl flex flex-col gap-y-4 w-full self-end">
            <div className="z-10">
              <h1>Telegram Username</h1>
              <input className="w-full border border-black p-1 rounded-md" />
            </div>
            <div className="z-10">
              <h1>Name</h1>
              <input className="w-full border border-black p-1 rounded-md" />
            </div>
            <div className="z-10">
              <h1>Speciality</h1>
              <input className="w-full border border-black p-1 rounded-md" />
            </div>
            <button className="bg-[#FFF348] self-end px-4 py-1 rounded-md">
              Connect
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const mentorsData = [
  {
    name: "Alice Johnson",
    speciality: "Smart Contracts",
    telegram: "@alicej_smart",
  },
  {
    name: "Bob Smith",
    speciality: "Blockchain Security",
    telegram: "@bob_secure",
  },
  {
    name: "Charlie Lee",
    speciality: "DeFi",
    telegram: "@charlie_defi",
  },
  {
    name: "Diana Prince",
    speciality: "NFTs",
    telegram: "@diana_nft",
  },
  {
    name: "Ethan Hunt",
    speciality: "DAO Governance",
    telegram: "@ethan_dao",
  },
  {
    name: "Fiona Gallagher",
    speciality: "Cryptography",
    telegram: "@fiona_crypto",
  },
  {
    name: "George Miller",
    speciality: "Layer 2 Solutions",
    telegram: "@george_layer2",
  },
  {
    name: "Hannah Turner",
    speciality: "Web3 Development",
    telegram: "@hannah_web3dev",
  },
  {
    name: "Ian Fleming",
    speciality: "Blockchain Infrastructure",
    telegram: "@ian_infra",
  },
  {
    name: "Jessica Wong",
    speciality: "Tokenomics",
    telegram: "@jessica_token",
  },
];
