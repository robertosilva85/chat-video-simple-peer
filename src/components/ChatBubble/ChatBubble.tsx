'use client';

interface Props {
  message: string;
}

export const ChatBubble = ({ message }: Props) => {
  return (
    <>
      <div className='flex flex-col items-start justify-start gap-2 mb-3'>
        <div className='flex items-center text-xs justify-center gap-2'>
          <span>You</span>
          <div className='flex justify-end pr-4 text-xs text-[#848485]'>
            10:00 AM
          </div>
        </div>
        <div className='text-sm mb-2'>{message}</div>
      </div>
    </>
  );
};
