import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'
function CraetCabinOption() {
    return (
        <>
            <Filter
                filteredField='discount'
                options={[
                    { value: 'all', label: 'All' },
                    { value: 'with-discount', label: 'With discount' },
                    { value: 'no-discount', label: 'No discount ' }
                ]

                }
            />
            <SortBy options={
                [

                    { value: 'name-asc', label: 'sort by name [A-Z]' },
                    { value: 'name-desc', label: 'sort by name [Z-A]' },
                    { value: 'regularPrice-asc', label: 'sort by price (low first)' },
                    { value: 'regularPrice-desc', label: 'sort by price (high first)' },
                    { value: 'maxCapacity-asc', label: 'sort by Capacity (low first)' },
                    { value: 'maxCapacity-desc', label: 'sort by Capacity (high first)' },


                ]} />
        </>
    )
}

export default CraetCabinOption