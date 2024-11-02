import './styles.css'

const addNewTodo = document.getElementById('addNewTodo')
const description = document.getElementById('description')
const dueDate = document.getElementById('dueDate')
const main = document.getElementById('main')

const generateUniqueID = () => {
    const maxLength = 8 + Math.ceil(Math.random() * 3)
    let id = ''
    for (let i = 0; i < maxLength; i++) {
        id += String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    }
    return id
}

const deleteTodo = (id) => {
    document.getElementById(id).remove()
    sessionStorage.removeItem(id)
}

const editTodo = (id, desc, date, prio) => {
    const container = document.createElement('div')
    container.id = 'editTodo'
    container.innerHTML = 'Edit Project Data:'

    const divOne = document.createElement('div')
    const labelText = document.createElement('label')
    labelText.innerHTML = 'Description'
    labelText.htmlFor = 'descriptionEdit'
    const textArea = document.createElement('textarea')
    textArea.id = 'descriptionEdit'
    textArea.rows = 3
    textArea.innerHTML = desc

    const divTwo = document.createElement('div')
    const labelDueDate = document.createElement('label')
    labelDueDate.innerHTML = 'Due Date'
    labelDueDate.htmlFor = 'dueDateEdit'
    const dueDateInfo = document.createElement('input')
    dueDateInfo.id = 'dueDateEdit'
    dueDateInfo.type = 'date'
    dueDateInfo.value = date

    const form = document.createElement('form')
    const labelPriority = document.createElement('label')
    labelPriority.innerHTML = 'Priority'
    const divThree = document.createElement('div')
    divThree.classList.add('editPriority')
    const inputHigh = document.createElement('input')
    inputHigh.id = 'highEdit'
    inputHigh.type = 'radio'
    inputHigh.value = 'High'
    inputHigh.name = 'priorityEdit'
    inputHigh.checked = prio === 'High'
    const labelHigh = document.createElement('label')
    labelHigh.innerHTML = 'High'
    const inputMedium = document.createElement('input')
    inputMedium.id = 'mediumEdit'
    inputMedium.type = 'radio'
    inputMedium.value = 'Medium'
    inputMedium.name = 'priorityEdit'
    inputMedium.checked = prio === 'Medium'
    const labelMedium = document.createElement('label')
    labelMedium.innerHTML = 'Medium'
    const inputLow = document.createElement('input')
    inputLow.id = 'lowEdit'
    inputLow.type = 'radio'
    inputLow.value = 'Low'
    inputLow.name = 'priorityEdit'
    inputLow.checked = prio === 'Low'
    const labelLow = document.createElement('label')
    labelLow.innerHTML = 'Low'

    const apply = document.createElement('button')
    apply.innerHTML = 'Apply'

    document.body.style.overflow = 'hidden'

    divOne.appendChild(labelText)
    divOne.appendChild(textArea)

    divTwo.appendChild(labelDueDate)
    divTwo.appendChild(dueDateInfo)

    divThree.appendChild(inputHigh)
    divThree.appendChild(labelHigh)
    divThree.appendChild(inputMedium)
    divThree.appendChild(labelMedium)
    divThree.appendChild(inputLow)
    divThree.appendChild(labelLow)

    form.appendChild(labelPriority)
    form.appendChild(divThree)

    container.appendChild(divOne)
    container.appendChild(divTwo)
    container.appendChild(form)
    container.appendChild(apply)

    main.appendChild(container)

    const closeEdit = (event) => {
        if (!container.contains(event.target)) {
            container.remove()
            document.removeEventListener('click', closeEdit)
            document.body.style.overflow = 'auto'
        }
    }

    setTimeout(() => document.addEventListener('click', closeEdit), 0)

    const updateDescription = (e) => {
        textArea.innerHTML = e.target.value
    }

    const updateDueDate = (e) => {
        dueDateInfo.value = e.target.value
    }

    const updateTodo = () => {
        const info = document.getElementById(id).querySelectorAll('.info')
        info[0].innerHTML = textArea.innerHTML
        info[1].innerHTML = dueDateInfo.value
        info[2].innerHTML = inputHigh.checked
            ? 'High'
            : inputMedium.checked
            ? 'Medium'
            : 'Low'

        document.getElementById(id).classList.remove('high', 'medium', 'low')
        document
            .getElementById(id)
            .classList.add(
                inputHigh.checked
                    ? 'high'
                    : inputMedium.checked
                    ? 'medium'
                    : 'low'
            )

        textArea.removeEventListener('input', updateDescription)
        dueDateInfo.removeEventListener('input', updateDueDate)

        container.remove()
        document.body.style.overflow = 'auto'

        sessionStorage.setItem(
            id,
            JSON.stringify({
                description: textArea.innerHTML,
                dueDate: dueDateInfo.value,
                priority: inputHigh.checked
                    ? 'High'
                    : inputMedium.checked
                    ? 'Medium'
                    : 'Low',
            })
        )
    }

    textArea.addEventListener('input', updateDescription)
    dueDateInfo.addEventListener('input', updateDueDate)

    apply.addEventListener('click', updateTodo)
}

const addNewTodoItem = () => {
    const descriptionText = document.getElementById('description').value
    const dueDateInfo = document.getElementById('dueDate').value
    const priorityInfo = Array.from(document.querySelectorAll('.radio')).filter(
        (item) => item.checked
    )[0].value

    const container = document.createElement('div')
    container.id = generateUniqueID()
    container.classList.add('todoContainer', priorityInfo.toLowerCase())
    const flex = document.createElement('div')
    flex.classList.add('flex')
    const project = document.createElement('div')
    project.innerHTML = 'Project'
    const edit = document.createElement('button')
    edit.innerHTML = 'edit'
    const del = document.createElement('button')
    del.innerHTML = 'delete'
    const description = document.createElement('div')
    description.classList.add('info')
    description.innerHTML = descriptionText
    const dueDate = document.createElement('div')
    dueDate.classList.add('info')
    dueDate.innerHTML = dueDateInfo
    const priority = document.createElement('div')
    priority.classList.add('info')
    priority.innerHTML = priorityInfo

    del.addEventListener('click', () => deleteTodo(container.id))
    edit.addEventListener('click', () =>
        editTodo(
            container.id,
            description.innerHTML,
            dueDate.innerHTML,
            priority.innerHTML
        )
    )

    flex.appendChild(project)
    flex.appendChild(edit)
    flex.appendChild(del)

    container.appendChild(flex)
    container.appendChild(description)
    container.appendChild(dueDate)
    container.appendChild(priority)

    main.appendChild(container)

    sessionStorage.setItem(
        container.id,
        JSON.stringify({
            description: description.innerHTML,
            dueDate: dueDate.innerHTML,
            priority: priority.innerHTML,
        })
    )
}

const loadSessionStorage = () => {
    const sessionStorageContent = { ...sessionStorage }
    for (let i in sessionStorageContent) {
        if (/^[a-z]{8,11}$/.test(i)) {
            const obj = JSON.parse(sessionStorage.getItem(i))
            if (obj.description && obj.dueDate && obj.priority) {
                const container = document.createElement('div')
                container.id = i
                container.classList.add(
                    'todoContainer',
                    obj.priority.toLowerCase()
                )
                const flex = document.createElement('div')
                flex.classList.add('flex')
                const project = document.createElement('div')
                project.innerHTML = 'Project'
                const edit = document.createElement('button')
                edit.innerHTML = 'edit'
                const del = document.createElement('button')
                del.innerHTML = 'delete'
                const description = document.createElement('div')
                description.classList.add('info')
                description.innerHTML = obj.description
                const dueDate = document.createElement('div')
                dueDate.classList.add('info')
                dueDate.innerHTML = obj.dueDate
                const priority = document.createElement('div')
                priority.classList.add('info')
                priority.innerHTML = obj.priority

                del.addEventListener('click', () => deleteTodo(container.id))
                edit.addEventListener('click', () =>
                    editTodo(
                        container.id,
                        description.innerHTML,
                        dueDate.innerHTML,
                        priority.innerHTML
                    )
                )

                flex.appendChild(project)
                flex.appendChild(edit)
                flex.appendChild(del)

                container.appendChild(flex)
                container.appendChild(description)
                container.appendChild(dueDate)
                container.appendChild(priority)

                main.appendChild(container)
            }
        }
    }
}

const toggleAddButton = () => {
    const descriptionText = document.getElementById('description').value
    const dueDateInfo = document.getElementById('dueDate').value

    if (descriptionText && dueDateInfo) addNewTodo.removeAttribute('disabled')
    else addNewTodo.setAttribute('disabled', true)
}

addNewTodo.addEventListener('click', addNewTodoItem)
description.addEventListener('input', toggleAddButton)
dueDate.addEventListener('change', toggleAddButton)

window.addEventListener('load', loadSessionStorage)
