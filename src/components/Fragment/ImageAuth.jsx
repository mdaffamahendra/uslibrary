import Image from "../Element/Image"

const ImageAuth = () => {
    return (
    <div className="md:w-1/2 hidden md:block">
        <Image src={'/signIn.jpg'} alt={'Buku'} className={"w-full h-full object-cover rounded-lg"} />
    </div>
    )
}

export default ImageAuth