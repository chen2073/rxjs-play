import { Observable } from 'rxjs'

function* generator(start) {
    for (const x of [1, 2, 3, 4, 5]) {
        yield start + x
    }
  }

const observable = new Observable((subscriber) => {

  const gen = generator(10)
  setInterval(() => {
    subscriber.next('emitting')
    const value = gen.next().value
    if (value === undefined){
        subscriber.complete()
    } 
    subscriber.next(value)
    }, 2000)

})

console.log('just before subscribe')
observable.subscribe({
  next(x) {
    console.log('got value ' + x)
  },
  error(err) {
    console.error('something wrong occurred: ' + err)
  },
  complete() {
    console.log('done')
    process.exit()
  },
})
console.log('just after subscribe')