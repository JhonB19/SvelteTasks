<script>
  import { db } from "./firebase";
  import {
    addDoc,
    collection,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
  } from "firebase/firestore";
  import { onDestroy } from "svelte";
  import Toastify from "toastify-js";

  let task = {
    name: "",
    description: "",
  };

  let tasks = [];
  let editStatus = false;
  let currentTaskId = "";

  const addTask = async () => {
    try {
      await addDoc(collection(db, "tasks"), {
		...task,
		createdAt: new Date(),

	  });
      Toastify({
        text: "Tarea Creada",
      }).showToast();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async () => {
    try {
      await updateDoc(doc(db, "tasks", currentTaskId), task);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    try {
      if (editStatus) {
        updateTask();
      } else {
        addTask();
      }
    } catch (error) {
      console.error(error);
    }

    task = {
      name: "",
      description: "",
    };
    editStatus = false;
    currentTaskId = "";
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      Toastify({
        text: "Tarea Eliminada",
        style: {
          background: "#f44336",
        },
      }).showToast();
    } catch (error) {
      console.error(error);
    }
  };

  const editTask = (currentTask) => {
    task.name = currentTask.name;
    task.description = currentTask.description;
    currentTaskId = currentTask.id;
    editStatus = true;
  };

  const unsub = onSnapshot(
    collection(db, "tasks"),
    (querySnapshot) => {
      tasks = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    },
    (err) => {
      console.log(err);
    }
  );

  onDestroy(unsub);
</script>

<main>
  <div class="container p-4">
    <div class="row">
      <div class="col-md-6">
        <form
          on:submit|preventDefault={handleSubmit}
          class="card card-body p-5"
        >
          <div class="mb-3">
            <label for="title" class="text-secondary fs-5"
              >Nombre de Tarea</label
            >
            <input
              bind:value={task.name}
              type="text"
              placeholder="Escribe una tarea"
              class="form-control"
            />
          </div>

          <div class="mb-3">
            <label for="title" class="text-secondary fs-5">Descripción de Tarea</label>
            <textarea
              bind:value={task.description}
              rows="3"
              placeholder="Escribe la descripción de la tarea"
			  class="form-control"
            ></textarea>
          </div>

          <div>
			<button class="btn btn-success"> Guardar </button>
		  </div>
        </form>
      </div>

      <div class="col-md-6">
        {#each tasks as task}
          <div class="card card-body mt-2">
            <div class="d-flex justify-content-between">
              <h5>{task.name}</h5>
              <i class="material-icons" on:click={editTask(task)}>edit</i>
            </div>
            <p>{task.description}</p>
            <div>
              <button class="btn btn-danger" on:click={deleteTask(task.id)}>
                <i class="material-icons" style="vertical-align:middle"
                  >delete_forever</i
                >Eliminar</button
              >
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
</style>
