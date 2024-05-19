import Modal from "../../ui/Modal";
import Button from "../../ui/Button"
import CreateCabinForm from "./CreateCabinForm";



export default function AddCapin() {
    return (
        <div>
            <Modal>
                <Modal.Open opens='capin-form'>
                    <Button>Add Room </Button>
                </Modal.Open>
                <Modal.Window name='capin-form'>
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </div>

    )
}

// export default function AddCapin() {
//     const [isopenModal, setIsopenModal] = useState(false);

//     return (
//         <>
//             <Button onClick={() => { setIsopenModal((open) => !open) }} >Add new capin </Button>
//             {isopenModal &&
//                 <Modal onCloseModal={() => setIsopenModal(false)} >
//                     <CreateCabinForm onCloseModal={() => setIsopenModal(false)} />
//                 </Modal>}
//         </>
//     )
// }
