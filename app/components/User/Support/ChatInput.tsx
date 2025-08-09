import { File, Loader, Paperclip, SendHorizontal, X } from "lucide-react";

interface inputProps {
  fileVal: null | File;
  loaderVal: boolean;
  inpRef: React.RefObject<HTMLInputElement>;
  onSetFile: (file: File | null) => void;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function ChatInput({
  fileVal,
  loaderVal,
  inpRef,
  onSetFile,
  onFormSubmit
}: inputProps) {
  return (
    <form className="h-[3rem] bg-[var(--second-color)] border-3 border-[var(--first-color)] rounded-b-[10px] grid grid-cols-[4%_91%_5%] place-items-center relative"
    onSubmit={onFormSubmit}
    >
      <input
        type="file"
        className="hidden"
        id="imagePicker"
        value={""}
        accept="image/*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if(e?.target?.files?.[0]){
            onSetFile(e.target.files[0]);
          }
        }}
      />
      {fileVal ? (
        <X className="cursor-pointer" onClick={() => onSetFile(null)} />
      ) : (
        <label htmlFor="imagePicker">
          <Paperclip className="cursor-pointer" />
        </label>
      )}
      {fileVal ? (
        <File />
      ) : (
        <input
          className="w-full h-full text-[18px] bg-transparent border-none outline-none"
          type="text"
          name="message"
          placeholder="Type here..."
          required
          autoComplete="off"
          ref={inpRef}
        />
      )}
      {loaderVal ? (
        <Loader className="cursor-pointer support-btn-loader" />
      ) : (
        <SendHorizontal className="cursor-pointer" />
      )}
      <button
        type="submit"
        className="bg-transparent border-none outline-none absolute w-[5%] h-full right-[0] cursor-pointer"
      ></button>
    </form>
  );
}
