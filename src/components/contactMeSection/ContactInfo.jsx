import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import SingleInfo from "./SingleInfo";

const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-4">
      <SingleInfo text="adityamayank708@gmail.com" Image={HiOutlineMail} />
      <SingleInfo text="+91 9643354240" Image={FiPhone} />
      <SingleInfo text="Ghaziabad, India" Image={IoLocationOutline} />
    </div>
  );
};

export default ContactInfo;
