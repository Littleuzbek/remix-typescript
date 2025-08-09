import { Fragment, useEffect, useRef, useState } from "react";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { useFetcher } from "@remix-run/react";
// import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "lucide-react";
import { auth, db } from "~/firebase";
import ChatInput from "./ChatInput";

interface Message {
  date: Timestamp;
  userImage?: string;
  userMessage?: string;
  message?: string;
  image?: string;
}

export default function Support() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  // const [viewer, setViewer] = useState<boolean | string>(false);
  const [file, setFile] = useState<null | File>(null);
  const inpRef = useRef<HTMLInputElement | null>(null);
  const fetcher = useFetcher();
  // const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const getMessages = onSnapshot(
          collection(db, "exko", "support", "users", user.uid, "chat"),
          (query) => {
            const messagesArr = [] as Message[];

            query?.forEach((item) => messagesArr.push(item.data() as Message));

            if (messagesArr) {
              setMessages(
                messagesArr?.sort(
                  (a, b) => b.date.toMillis() - a.date.toMillis()
                )
              );
            }
          }
        );

        return () => getMessages();
      }
    });

    return () => unsubscribe();
  }, []);

  const sendHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoader(true);
      const target = e.target as HTMLFormElement;
      const formData = new FormData(target);
      const token = await auth?.currentUser?.getIdToken();

      if(token){
        formData.append("idToken", token);
      }
      // formData.append("updater", false);

      if (file) {
        formData.append("image", file);
      }

      if (messages.length === 0) {
        formData.append("exist", "false");
        formData.append(
          "setData",
          JSON.stringify({
            userId: auth?.currentUser?.uid,
            name: auth?.currentUser?.displayName,
            number: auth?.currentUser?.email || auth.currentUser?.phoneNumber,
          })
        );
        fetcher.submit(formData, {
          method: "post",
          encType: "multipart/form-data",
        });
      } else {
        formData.append("exist", "true");
        fetcher.submit(formData, {
          method: "post",
          encType: "multipart/form-data",
        });
      }

      if (inpRef?.current) {
        inpRef.current.value = "";
      }

      setFile(null);
    } catch (err) {
      setLoader(false);
      setFile(null);
      console.log(err);
    }
  };

  useEffect(() => {
    if (fetcher?.data) {
      setLoader(false);
    }
  }, [fetcher?.data]);

  return (
    <div className="h-fit p-[1rem] border-3 border-[var(--first-color)] rounded-[20px]">
      <div className="py-[10px] px-[1rem] border-b-3 border-[var(--first-color)] rounded-t-[10px] flex items-center justify-center gap-[1rem] bg-[var(--second-color)] ">
        <User className="w-[2.5rem] h-[2.5rem] rounded-full p-[5px] border-3 border-[var(--first-color)] text-[var(--first-color)]" />
        <h2 className="text-[var(--first-color)]">EXKO</h2>
      </div>
      <div className="h-[20rem] p-[10px] bg-[var(--second-color)] flex flex-col-reverse gap-[.5rem] overflow-auto [&::-webkit-scrollbar]:hidden">
        {messages?.map((m, i) => (
          <Fragment key={i}>
            {m.userMessage || m.userImage ? (
              <div className="flex flex-row-reverse">
                {m.userMessage ? (
                  <p className="w-fit max-w-[40rem] h-fit bg-[white] py-[10px] px-[15px] rounded-[20px] rounded-tr-none text-[18px] break-normal whitespace-pre-wrap [-webkit-box-orient:vertical] text-ellipsis overflow-hidden [display:-webkit-box]">
                    {m.userMessage}
                  </p>
                ) : (
                  <img
                    src={m.userImage}
                    alt=""
                    className="max-w-[20rem] rounded-[20px] rounded-tl-none"
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col-row">
                {m.message ? (
                  <p className="w-fit max-w-[40rem] h-fit bg-[white] py-[10px] px-[15px] rounded-[20px] rounded-tl-none text-[18px] break-normal whitespace-pre-wrap [-webkit-box-orient:vertical] text-ellipsis overflow-hidden [display:-webkit-box]">
                    {m.message}
                  </p>
                ) : (
                  <img
                    src={m.image}
                    alt=""
                    className="max-w-[20rem] rounded-[20px] rounded-tl-none"
                  />
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <ChatInput
        fileVal={file}
        loaderVal={loader}
        inpRef={inpRef}
        onSetFile={setFile}
        onFormSubmit={sendHandler}
      />
    </div>
  );
}
