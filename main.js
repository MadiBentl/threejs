import * as THREE from 'three';
import northernLights from './img/northern-lights.jpg'
import './style.css'

const container = document.querySelector('.three_bg');
const loader = new THREE.TextureLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(14, 8, 15, 9);
const material = new THREE.MeshBasicMaterial({
    map: loader.load(northernLights)
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.z = 5;

const count = geometry.attributes.position.count;
const clock = new THREE.Clock();

function animate() {
    const time = clock.getElapsedTime();
    for( let i = 0; i < count; i++) {
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getX(i);

        const anim1 = 0.25 * Math.sin(x + time *  0.7);

        geometry.attributes.position.setZ(i, anim1);
        geometry.computeVertexNormals();
        geometry.attributes.position.needsUpdate = true;
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera)
}
animate();

/* document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate(); */