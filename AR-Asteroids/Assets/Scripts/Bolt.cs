using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bolt : MonoBehaviour
{
    //[SerializeField] float speed = 0.01f;
    //public Camera fpsCam;

    // Start is called before the first frame update
    void Start()
    {
        Invoke("death", 5.0f);
    }

    // Update is called once per frame
    void Update()
    {
        //transform.position += new Vector3(0, 0, speed);
    }

    private void death()
    {
        Destroy(gameObject);
    }

    /*
    private void OnTriggerEnter(Collider other)
    {
        Debug.Log("Bolt has collied with something");

        if (other.CompareTag("Asteroid"))
        {
            Destroy(other.gameObject);
            Destroy(gameObject);
            Debug.Log("Bolt has destroied asteroid");
            //Invoke("destroySelf", .1f);
        }
    }
    */
}
