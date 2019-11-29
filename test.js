const Queue = require('bull');

const myFirstQueue = new Queue('my-first-queue');



(async function ad() {
    const job = await myFirstQueue.add({
    foo: 'bar',
  });
})();

async function init(){
   console.log(1)
   await sleep(10000)
   console.log(2)
}
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

myFirstQueue.process(async (job, done) => {
  console.log( 'Job data ' + job.data);
  let progress = 0;
   for (let i = 0; i < 10; i++) {
    await doSomething(job.data);
    progress += 10;
    job.progress(progress).catch(err => {
      console.log({ err }, 'Job progress err');
    });
    console.log({ progress }, 'After await');
  }

  done(null, {done: job.data}); //we need this if we are not using promise
});

const doSomething = data => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve,10000)
  });
};

myFirstQueue.on('completed', (job, result) => {
  console.log(`Job completed with result ${job}`);
});


myFirstQueue.on('progress', (job, progress) => {
console.log(`Job progress with result ${job} ${progress}`);
});



//ad();
//helloworld
