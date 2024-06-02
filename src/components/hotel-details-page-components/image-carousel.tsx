import * as React from "react"
import Image from 'next/image'

import {CardContent, Card} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"

interface ImageCarouselProps {
    images: string[]
}

export default function ImageCarousel({images}: ImageCarouselProps) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div>
            <Carousel setApi={setApi} className="w-full  max-w-lg shadow-primary shadow-md">
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <Image src={image} alt={`Image ${index + 1}`} width={500} height={500} className="w-full h-full object-cover"/>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
            <div className="py-4 my-2 text-center text-sm text-muted-foreground">
                Photo {current} of {count}
            </div>
        </div>
    )
}