import './tabla.css';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Show = () => {
    const [juguetes, setJuguetes] = useState( [] )

    const juguetesCollection = collection(db, "juguetes")

    const getJuguetes = async () =>{
        const data = await getDocs(juguetesCollection)
    
    setJuguetes(
      data.docs.map((doc) => ( {...doc.data(), id: doc.id} ))
    )

    }

    const deleteJuguete = async (id, imagenURL) =>{
      const jugueteDoc = doc(db, "juguetes", id)
      await deleteDoc(jugueteDoc)

      const storageRef = ref(storage, imagenURL)
      await deleteObject(storageRef)

      getJuguetes()
    }

    const confirmDelete = (id, imagenURL) =>{
      MySwal.fire({
        title: '¿Desea eliminar?',
        text: "El proceso sera irreversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor:'#3085d6',
        confirmButtonText: 'Si, borralo!!'
      }).then((result) =>{
        if (result.isConfirmed){
          deleteJuguete(id, imagenURL)
          Swal.fire(
            'Borrado!',
            'Tu archivo ha sido eliminado',
            'success'
          )
        }
      })
    }


    useEffect (() =>{
        getJuguetes()
    }, [])
  return (
    <>
    <div className='container' style={{ marginTop: '40px', marginBottom: '40px', borderRadius: '10px' }}>
      <div className='row'>
        <div className='col'>
          <div className='d-grid gap-2'>
            <Link to="/create" className='btn mt-2 mb-2' style={{ backgroundColor: 'rgb(60, 101, 223)', color: 'white' }} > <i className="fas fa-plus-circle"></i> Crear</Link>
          </div>

          <table className='table custom-table table-hover'>
            <thead>
              <tr>
                <th style={{ fontSize: '17px' }}>Imagen</th>
                <th style={{ fontSize: '17px' }}>Nombre</th>
                <th style={{ fontSize: '17px' }}>Descripcion</th>
                <th style={{ fontSize: '17px' }}>Precio</th>
                <th style={{ fontSize: '17px' }}>Categoria</th>
                <th style={{ fontSize: '17px' }}>Cantidad</th>
                <th style={{ fontSize: '17px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              { juguetes.map((juguete) =>(
                <tr key={juguete.id}>
                  <td><img src={juguete.imagen} alt={juguete.name} style={{ width: '100px' }} /></td>
                  <td>{juguete.name}</td>
                  <td>{juguete.descripcion}</td>
                  <td>{juguete.precio}</td>
                  <td>{juguete.categoria}</td>
                  <td>{juguete.cantidad}</td>
                  <td>
                    <Link to={`/edit/${juguete.id}`} className='btn btn-light'><i className="fa-solid fa-pen-to-square"></i></Link>
                    <button onClick={ () =>{ confirmDelete(juguete.id, juguete.imagen) }} className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default Show
