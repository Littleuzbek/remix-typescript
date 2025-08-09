export default function Skeleton() {
  return (
    <div className='skeleton_card w-[225px] my-[1rem]  relative overflow-hidden'>
      <span className='skeleton_image bg-[var(--second-color)] relative overflow-hidden w-full h-[200px] m-[1rem_auto] block after:content-[""] after:w-full after:h-full after:absolute after:top-[0] after:left-[0] after:z-[0] after:bg-[var(--second-color)] '>
        <img
          src=""
          alt=""
        />
      </span>
      <div className="info_block w-full grid gap-[10px] m-[.5rem_auto]">
        <p className="bg-[var(--second-color)] w-[90%] h-[20px] relative overflow-hidden"></p>
        <p className="bg-[var(--second-color)] w-[70%] h-[20px] relative overflow-hidden"></p>
      </div>
      <div className="info_block w-full flex justify-between gap-[10px] m-[.5rem_auto]">
        <p className="bg-[var(--second-color)] w-[50%] h-[20px] relative overflow-hidden"></p>
        <span className="bg-[var(--second-color)] w-[20px] h-[20px] rounded-[50%] relative overflow-hidden"></span>
      </div>
    </div>
  );
}
