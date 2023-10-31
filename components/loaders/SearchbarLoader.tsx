import Image from "next/image";
import { Input } from "../ui/input";

export default function SearchbarLoader() {
    return (
        <div className='searchbar'>
      <Image
        src='/assets/search-gray.svg'
        alt='search'
        width={24}
        height={24}
        className='object-contain'
      />
      <Input
        id='text'
        disabled
        placeholder="Search ..."
        className='no-focus searchbar_input'
      />
    </div>
    )
}