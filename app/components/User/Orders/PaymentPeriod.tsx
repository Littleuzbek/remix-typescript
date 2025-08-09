import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { formatDate, isString, PriceFormatter } from "../../Extra/Extra";
import { nasiyaItems } from "~/utils";

export default function PaymentPeriod({ nasiya }: {nasiya: nasiyaItems}) {
  return (
    <>
      <span>
        <p className="text-[18px]">
          {isString(nasiya?.payment1?.date)
            ? nasiya?.payment1?.date
            : formatDate(nasiya?.payment1?.date, true)}
        </p>
        {nasiya?.payment1?.condition ? (
          <MdOutlineRadioButtonChecked className="text-[1.5rem]"/>
        ) : (
          <MdOutlineRadioButtonUnchecked className="text-[1.5rem]" />
        )}
        <p className="text-[18px]">{PriceFormatter(nasiya?.payment1?.sum)}</p>
      </span>
      <TfiLayoutLineSolid className="text-[3.5rem]" />
      <span>
        <p className="text-[18px]">
          {isString(nasiya?.payment2?.date)
            ? nasiya?.payment2?.date
            : formatDate(nasiya?.payment2?.date, true)}
        </p>
        {nasiya?.payment2?.condition ? (
          <MdOutlineRadioButtonChecked className="text-[1.5rem]"/>
        ) : (
          <MdOutlineRadioButtonUnchecked className="text-[1.5rem]" />
        )}
        <p className="text-[18px]">{PriceFormatter(nasiya?.payment2?.sum)}</p>
      </span>
      <TfiLayoutLineSolid className="text-[3.5rem]" />
      <span className="border-0">
        <p className="text-[18px]">
          {isString(nasiya?.payment3?.date)
            ? nasiya?.payment3?.date
            : formatDate(nasiya?.payment3?.date, true)}
        </p>
        {nasiya?.payment3?.condition ? (
          <MdOutlineRadioButtonChecked className="text-[1.5rem]"/>
        ) : (
          <MdOutlineRadioButtonUnchecked className="text-[1.5rem]" />
        )}
        <p className="text-[18px]">{PriceFormatter(nasiya?.payment3?.sum)}</p>
      </span>
    </>
  );
}
