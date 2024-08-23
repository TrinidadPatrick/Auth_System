
interface Props {
  title: string;
  paragraph: string;
}

export const FormHeader = ({ title, paragraph } : Props) => {
  return ( 
    <div className="w-full flex flex-col justify-center items-center my-3 gap-2">
      <h1 className="text-3xl font-bold text-start w-full">{title}</h1>
      <p className=" text-gray-500 text-xs w-full text-start">{paragraph}</p>
    </div>
   )

}