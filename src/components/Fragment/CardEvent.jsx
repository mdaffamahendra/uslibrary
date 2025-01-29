import { useDispatch, useSelector } from "react-redux";
import useLogin from "../../hooks/useLogin";
import { joinEvents } from "../../redux/slice/PustakawanSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const CardEvent = ({ event, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden`}>
      <div className="p-6 flex flex-col justify-between items-start">
        {children}
      </div>
    </div>
  );
};

const HeaderCard = ({ event }) => {
  return (
    <h2 className="text-2xl font-semibold text-blue-600">{event.title}</h2>
  );
};

const BodyCard = ({ event }) => {
  return (
    <div>
      <p className="text-gray-500 mt-2">
        {new Date(event.date).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className="mt-4 text-gray-700">{event.description}</p>
    </div>
  );
};

const FooterCard = ({ event, type = "" }) => {
  const dispatch = useDispatch();
  const pustakawanLogin = useLogin();
  const { idPustakawan } = pustakawanLogin;
  const allPustakawan = useSelector((state) => state.pustakawan.data);
  const pustakawanEvent =
    allPustakawan.find(
      (pustakawan) => pustakawan.idPustakawan === pustakawanLogin?.idPustakawan
    )?.eventParticipations || [];
  const eventCheck = pustakawanEvent.find((e) => e.id === event.id);

  const handleSign = () => {
    if (pustakawanLogin) {
      if (eventCheck) {
        MySwal.fire({
          title: "Silahkan Masuk Terlebih Dahulu",
          text: "Untuk mendaftar event perpustakaan harap masuk terlebih dahulu",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        dispatch(joinEvents({ idPustakawan, event }));
        MySwal.fire({
          title: "Daftar Berhasil",
          text: "Selamat anda berhasil mendaftar pada event ini",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } else {
      MySwal.fire({
        title: "Silahkan Masuk Terlebih Dahulu",
        text: "Untuk mendaftar event perpustakaan harap masuk terlebih dahulu",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return type === "profile" ? (
    <div></div>
  ) : (
    <div className="py-4">
      <button
        type="button"
        className={`bg-green-500 text-white text-xs md:text-md px-3 py-1 rounded hover:bg-green-600 ${
          eventCheck ? "disabled:bg-gray-400 disabled:cursor-not-allowed" : ""
        }`}
        disabled={eventCheck}
        onClick={handleSign}
      >
        Daftar
      </button>
    </div>
  );
};

CardEvent.HeaderCard = HeaderCard;
CardEvent.BodyCard = BodyCard;
CardEvent.FooterCard = FooterCard;
export default CardEvent;
