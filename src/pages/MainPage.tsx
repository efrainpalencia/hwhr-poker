import pokerTableSrc from "../assets/images/poker-table.png";
import pic1 from "../assets/images/Picture1.jpg";
import pic2 from "../assets/images/Picture2.jpg";
import pic3 from "../assets/images/Picture3.jpg";
import pic4 from "../assets/images/Picture4.jpg";
import pic5 from "../assets/images/Picture5.jpg";
import pic6 from "../assets/images/Picture6.jpg";

export default function MainPage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Seminole Gaming</h1>
      <h1 className="text-2xl font-bold mb-4">Poker Rule Book / Procedures</h1>
      <h1 className="text-2xl italic m-6">
        <span className="text-red-700">♥ </span> ♣
        <span className="text-red-700"> ♦</span> ♠
      </h1>
      <h1 className="text-2xl italic">2nd Revised Draft</h1>
      <h2 className="m-6">Covered Casinos</h2>
      <div className="grid grid-cols-3 align-baseline gap-4 mt-24">
        <img className="rounded-lg" src={pic1} alt="Hard Rock Tampa" />
        <img className="rounded-lg" src={pic2} alt="Hard Rock Hollywood" />
        <img className="rounded-lg" src={pic3} alt="Seminole Brighton" />
        <img className="rounded-lg" src={pic4} alt="Seminole Coconut Creek" />
        <img className="rounded-lg" src={pic5} alt="Seminole Hollywood" />
        <img className="rounded-lg" src={pic6} alt="Seminole Imokalee" />
      </div>
    </div>
  );
}
