import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db, storage } from '../firebaseConfig/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Create = () => {

    const [ name, setName ] = useState('')
    const [ descripcion, setDescripcion ] = useState('')
    const [ precio, setPrecio ] = useState('')
    const [imagen, setImagen] = useState(null)
    const [ categoria, setCategoria ] = useState('')
    const [ cantidad, setCantidad ] = useState('')
    const navigate = useNavigate()

   const juguetesCollection = collection(db, "juguetes")

   const store = async (e) => {
    e.preventDefault()
    if(name && descripcion && precio && imagen && categoria && cantidad){

        const precioNum = Number(precio);
            const cantidadNum = Number(cantidad);

            if (isNaN(precioNum) || isNaN(cantidadNum)) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Precio y cantidad deben ser números válidos.',
                });
                return;
            }

        const storageRef = ref(storage, `juguetes/${imagen.name}`)
        await uploadBytes(storageRef, imagen)
        const imageUrl = await getDownloadURL(storageRef)

        await addDoc( juguetesCollection, {name: name, descripcion: descripcion, precio: precioNum, imagen: imageUrl, categoria: categoria, cantidad: cantidadNum } )
        MySwal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'El juguete se ha creado correctamente.',
        }).then(() => {
            navigate('/')
        })
    }else{
        MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, completa todos los campos antes de crear el juguete.',
        })
    }
   }

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    }

  return (
    <div className='container' style={{ backgroundColor: 'rgb(241, 147, 96)', marginTop: '40px', marginBottom: '40px', borderRadius: '10px' } }>
        <div className='row'>
            <div className='col'>
                <h1>Crear Juguete</h1>

                <form onSubmit={ store }>
                    <div className='mb-3'>
                        <label className='form-label' style={{ fontSize: '20px' }}>Nombre</label>
                        <input 
                            value={ name }
                            onChange={ (e) => setName(e.target.value)}
                            type='text'
                            className='form-control'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label' style={{ fontSize: '20px' }}>Descripcion</label>
                        <input 
                            value={ descripcion }
                            onChange={ (e) => setDescripcion(e.target.value)}
                            type='text'
                            className='form-control'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label' style={{ fontSize: '20px' }}>Precio</label>
                        <input 
                            value={ precio }
                            onChange={ (e) => setPrecio(e.target.value)}
                            type='number'
                            className='form-control'
                        />
                    </div>

                    <div className='mb-3'>
                            <label className='form-label' style={{ fontSize: '20px' }}>Imagen</label>
                            <input
                                onChange={handleImageChange}
                                type='file'
                                className='form-control'
                            />
                    </div>

                    <div className='mb-3'>
                            <label className='form-label' style={{ fontSize: '20px' }}>Categoría</label>
                            <select 
                                value={categoria} 
                                onChange={(e) => setCategoria(e.target.value)} 
                                className='form-control'
                            >
                                <option value="">Selecciona una categoría</option>
                                <option value="Carros">Carros</option>
                                <option value="Infantes">Infantes</option>
                                <option value="Peluches">Peluches</option>
                                <option value="Articulables">Articulables</option>
                                <option value="Interactivos">Interactivos</option>
                            </select>
                    </div>

                    <div className='mb-3'>
                        <label className='form-label' style={{ fontSize: '20px' }}>Cantidad</label>
                        <input 
                            value={ cantidad }
                            onChange={ (e) => setCantidad(e.target.value)}
                            type='number'
                            className='form-control'
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>Crear</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Create
