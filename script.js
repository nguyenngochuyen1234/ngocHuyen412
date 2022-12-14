
    
    var uppdateArrayLesson = []
    const btnRenderList = document.getElementById('btnRenderList');
    const btnClose = document.getElementById('btnClose');
    const Delete = document.getElementById('btnDelete');
    const listContainer = document.getElementById('listContainer');
    const deleteName = document.getElementById('deleteName');
    const stringName = document.getElementById('name')
    const stringDays = document.getElementById('day')
    const stringHours = document.getElementById('hour')
    const hours = document.querySelectorAll('#ca')
    const listLi = document.getElementById("listLi")
    var inputs = [stringName, stringDays, stringHours]
    var listSorte = ''
    var arrayLesson = [
        {
                caHoc: 1,
                Thu: [[],[],[],[],[],[]]
            },
            {
                caHoc: 2,
                Thu: [[],[],[],[],[],[]]
            },
            {
                caHoc: 3,
                Thu: [[],[],[],[],[],[]]
            },
            {
                caHoc: 4,
                Thu: [[],[],[],[],[],[]]
            
            },
            {
                caHoc: 5,
                Thu: [[],[],[],[],[],[]]
            },
            {
                caHoc: 6,
                Thu: [[],[],[],[],[],[]]
            },
            {
                caHoc: 7,
                Thu: [[],[],[],[],[],[]]
            },
            {
                caHoc: 8,
                Thu: [[],[],[],[],[],[]]
            },
            {
                caHoc: 9,
                Thu: [[],[],[],[],[],[]]
            },
            {
                caHoc: 10,
                Thu: [[],[],[],[],[],[]]
            },
        ]
        arrayLesson = JSON.parse(localStorage.getItem('list'))
        render(arrayLesson)
        var updateArrayLesson
        var error = 'Nhập sai, vui lòng nhập lại'
//check nhập lỗi
        function checkInput(getDaysValue, getArrayHoursValue){
            let testLenght = (getDaysValue.length === getArrayHoursValue.length || undefined)
            let testLimitDays = 1
            let testLimitHours = 1
            getDaysValue.forEach(day=>{
                (parseInt(day) > 7 || parseInt(day) < 2) && (testLimitDays = undefined) 
            })
            getArrayHoursValue.forEach(hours=>{
                hours.forEach(hour=>{
                    (parseInt(hour) > 10 || parseInt(hour) < 1) && (testLimitHours = undefined) 
                })
            })
            return testLenght && testLimitDays && testLimitHours
        }
        
//submit
function submit(){
    document.getElementById('myform').addEventListener('submit', function(e){
        e.preventDefault();
            var getArrayHoursValue = []
            var stringNamesValue = stringName.value
            var getDaysValue = stringDays.value.trim().split(';')
            var getHoursValue = stringHours.value.split(';')
            arrayHours = ''
            var sortArray = []
            stringName.onchange = function(){
                stringNamesValue = stringName.value
            }
            stringDays.onchange = function(){
                getDaysValue = stringDays.value.split(';')
            }
            stringHours.onchange = function(){
                getHoursValue = stringHours.value.split(';')
            }
            getHoursValue.map(getHourValue =>{
                getArrayHoursValue.push(getHourValue.split('-'))
            })

// check nhập lỗi
            checkInput(getDaysValue,getArrayHoursValue) || alert('Nhập lỗi, vui lòng nhập lại')
            for(let i = 0;i<getArrayHoursValue.length;i++){
                getArrayHoursValue[i].forEach((everyHours) =>{
                    arrayLesson.forEach(lesson=>{
                        if((isNaN(parseInt(getDaysValue[i]))===false)&&checkInput(getDaysValue,getArrayHoursValue)){
                            lesson.caHoc===parseInt(everyHours)?{...lesson,Thu: lesson.Thu[parseInt(getDaysValue[i])-2].push(stringNamesValue)}:lesson
                        }
                    })
                })
            }
            localStorage.setItem('list',JSON.stringify(arrayLesson))
            inputs.forEach(input=>{
                input.value = ''
            })
            listSorte = ''
            for(let i = 0;i<10;i++){
                arrayLesson[i].Thu.forEach((names,index)=>{
                    names.length > 3 && sortArray.push(names.length)
                })
            }    
            console.log(sortedArray(sortArray))    
            for (sorted of sortedArray(sortArray)){
                for(let i = 0;i<10;i++){
                    arrayLesson[i].Thu.forEach((names,index)=>{
                        listSorte += sorted === names.length ? `<li>Thứ: ${index+2}      Ca: ${i+1}      Số thành viên: ${sorted}</li>` : ``
                    })
                }
            }        
//Render danh sachs thành viên
            listLi.innerHTML = listSorte
            render(arrayLesson)
        });
    }
    submit()
    function init(){
        updateArrayLesson = JSON.parse(localStorage.getItem('list'))
        render(updateArrayLesson)
    }
//hiện danh sách
    btnRenderList.addEventListener('click',()=>{
        listContainer.classList.add('show')
    })
//Ẩn danh sách
    btnClose.addEventListener('click',()=>{
        listContainer.classList.remove('show')
    })
// Xóa tên
    function deleteNameHandle(Name){
        arrayLesson.forEach(lesson=>{
            lesson.Thu.forEach(tens=>{
                tens.forEach((ten,index)=>{
                    ten===Name && tens.splice(index,1) 
                })
            })
        })
        localStorage.setItem('list',JSON.stringify(arrayLesson))
    }
    Delete.addEventListener('click',(e)=>{
        e.preventDefault();
        deleteNameHandle(deleteName.value)
        render(arrayLesson)
        submit()
        deleteName.value = ''
    })
    var sortArray
    function render(arrayLesson){
        var arrayHours = ''
        hours.forEach((hour,index)=>{
            sortArray = []
// updateArrayLessonHandle()
            arrayHours = `<td>${index+1}</td>`
            arrayLesson[index].Thu.forEach(names=>{
                var arrayNames = ''
                names.length >= 4 && sortArray.push(names.length)
                names.forEach(name=>{arrayNames +=`<li>${name}</li>`})
                arrayHours+=(names.length>0 ? `<td><span>${names.length}</span>${arrayNames}</td>`:`<td></td>`) 
                })
            hour.innerHTML = arrayHours
            }
        )
    }
//Loại bỏ số trùng nhau và sắp xếp theo thứ tự
    function sortedArray(array){
        array.sort((a, b) => b - a);
        mySet = new Set(array)
        return mySet
    }
    
