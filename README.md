# Pulumi EKS deployment
to run the stack you can do 
```sh
pulumi up

```

## Destroying everything after experimentation
After you are done experimenting you can destroy everything by doing
```sh
pulumi destroy --yes && pulumi stack rm --yes
```