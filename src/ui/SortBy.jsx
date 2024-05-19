import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('sortBy') || "";
    function hundleChange(e) {
        searchParams.set('sortBy', e.target.value);
        setSearchParams(searchParams);
    }
    return <Select
        type='white'
        options={options}
        onChange={hundleChange}
        value={sortBy} />;
}
