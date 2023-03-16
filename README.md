# Pulumi EKS deployment
to run the stack you can do 
```sh
pulumi up
```

## Stacks
Pulumi allows us to have multiple stacks. For these project we will have a development and a production stack. Stacks let you deploy clones of the same resources, in different deployment. this is to help during testing, development or any other reason.

<br>

### Creating a stack
To create a mew stack you need to run.
```sh 
pulumi stack init
```
You will be prompted to a add a stack name. stack can be used to clone same resources for different environment ie. dev and prod. This makes it easy for development and deployment of resources.

You might consider adding a YAML file for each stack. the name convention is `Pulumi.stackname.yaml` where the `stackname` is replaced by an actual stack name. 

<br>

### Navigating through stacks
If you are dealing with multiple stack you should understand that stacks work more like git branches. `pulumi up` will create the current selected stack and you can list your stacks by doing 
```sh
pulumi stack list
```
you can switch through the stacks by doing

```sh 
pulumi stack select stackname
```
Where `stackname` is the name of the stack. 

<br>

### Deploying stacks
Doing `pulumi up` will push the current stack but you can specify what stack you need to deploy by doing

```sh
pulumi up stackname
```
Replacing `stackname` with an actual stack name

<br>

### Getting stack name and other configurations on the code
You can actually get the stack specific configurations in the deployment code. let use a little example where we try to use the stack name on the code base.
we first need to import getStack() in the project. this is done by doing
<br>
```ts
import { getStack } from "@pulumi/pulumi"
``` 
Then we can use this in code eg name the s3 bucket name
```ts
const bucket = new aws.s3.Bucket("my-bucket", {
    bucket: `unique-bucket-name-${getStack()}`
})
``` 
This will create an S3 bucket named `unique-bucket-name-stack-name` where stack-name is the name of the stack.

<br>

## Configs
 A config file is created when creating a Pulumi project. this file is called `Pulumi.yaml`. Different config files will also be created either manually or automatically when creating new stacks. The naming convention will be `Pulumi.stackname.yaml`.

You can access the content of these YAML files in the typescript of the project. You can define a variable like so.
```yaml
config
    aws:region: us-west-1
    project-name:config-value: the-value
```

or you add the value using a command line
```sh
pulumi config set config-value the-value
```

You can get this value inside the project like so (im assuming we are using typescript in the project)
```ts
import * as pulumi from "@pulumi/pulumi"

const config = new pulumi.Config();
const configValue = config.require("config-value")

console.log(configValue) // this will output "the-value"
```

Using require will break the system if the config value is not defined. This mandatory to ensure developers don't accidentally define a variable in one stack and forget to initialize it in another.

If you do not want the system to break if value is not available you can use `config.get()` method instead.


<br>

## Destroying everything after experimentation
After you are done experimenting you can destroy everything by doing
```sh
pulumi destroy --yes && pulumi stack rm --yes
```

It should be noted that deleting and destroying a stack are two different things. Destroying a stack only removes the stacks resources on the server but pulumi still holds the stack meaning if we do `pulumi stack ls` we can still see the stack and if we do `pulumi up` we can recreate resources on the serve for the destroyed stack

If we want to completely remove the stack everywhere the we have to do a `pulumi stack rm stackname` we replace stack name with the actual stack name.