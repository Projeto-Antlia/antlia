import axios from "axios";
import { Box } from "native-base";
import { useState, useEffect } from "react";
import { URL_API } from "../../config";
import { ButtonFilter } from "../ButtonFilter/ButtonFilter";


type Category = {
    id: string;
    title: string;
    image: string;
}
type Props = {
    onCategorySelected: (cat: Category) => void;
    categorySelected?: Category
}

const Categories = ({ onCategorySelected, categorySelected }: Props) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {

        axios.get(`${URL_API}/categories`).then(res => {
            setCategories(res.data);
        })

    }, [])

    const handleIsActive = (cat: Category) => {
        onCategorySelected(cat)
    }

    return (

        <Box display='flex' flexDirection='row' justifyContent='space-around' mt='10' >
            {
                categories.map((item, index) => (
                    <ButtonFilter
                        key={index}
                        emit={handleIsActive}
                        isActive={categorySelected?.id === item.id}
                        category={item}
                    />
                ))
            }
        </Box>
    )
}

export default Categories;