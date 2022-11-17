# Global Maven settings

You need to make sure you `~/.m2/settings.xml` file is configured correctly to use the Slingr repo:

```
<settings>
    <servers>
        <server>
            <id>slingrRepo.write.release</id>
            <username>${GCS_ACCESS_KEY}</username>
            <password>${GCS_SECRET_KEY}</password>
        </server>
        <server>
            <id>slingrRepo.write.snapshot</id>
            <username>${GCS_ACCESS_KEY}</username>
            <password>${GCS_SECRET_KEY}</password>
        </server>
    </servers>
    <profiles>
        <profile>
            <id>slingrRepo</id>
            <activation>
                <property>
                    <name>!doNotUseSlingrRepo</name>
                </property>
            </activation>
            <repositories>
                <repository>
                    <id>slingrRepo.release</id>
                    <url>http://repo.slingrs.io/release</url>
                    <releases>
                      <enabled>true</enabled>
                      <checksumPolicy>fail</checksumPolicy>
                    </releases>
                    <snapshots>
                      <enabled>false</enabled>
                    </snapshots>
                </repository>
                <repository>
                    <id>slingrRepo.snapshot</id>
                    <url>http://repo.slingrs.io/snapshot</url>
                    <releases>
                      <enabled>false</enabled>
                    </releases>
                    <snapshots>
                      <enabled>true</enabled>
                      <checksumPolicy>warn</checksumPolicy>
                    </snapshots>
                </repository>
            </repositories>
        </profile>
    </profiles>
</settings>
```

Please notice that you should replace `GCS_ACCESS_KEY` and `GCS_SECRET_KEY` with valid credentials.

# Generation of archetype

1. Run command `mvn archetype:create-from-project`
2. Go to folder `target/generated-sources/archetype`
3. Edit file `src/main/resources/archetype-resources/pom.xml` and change the following line:
  ```
  <build.main-class>io.slingr.endpoints.skeleton.Runner</build.main-class>
  ```
  by:
  ```
  <build.main-class>${package}.Runner</build.main-class>
  ```
4. Edit file `pom.xml` and add the following snippet (you need `~/.m2/settings.xml` to be configured):
  ```
    <distributionManagement>
      <repository>
        <id>slingrRepo.write.release</id>
        <url>gs://repo.slingrs.io/release</url>
      </repository>
      <snapshotRepository>
        <id>slingrRepo.write.snapshot</id>
        <url>gs://repo.slingrs.io/snapshot</url>
      </snapshotRepository>
    </distributionManagement>
  ```
  Also you will need to add the following extension:
  ```
  <extensions>
    ...
    <extension>
      <groupId>net.anzix.aws</groupId>
      <artifactId>s3-maven-wagon</artifactId>
      <version>3.3</version>
    </extension>
    ...
  </extensions>
  ```
6. Delete file `src/main/resources/archetype-resources/README-DEV.md`
7. Run command `mvn clean install` to install locally

# Use of local archetype

1. Run command `mvn archetype:generate -DarchetypeCatalog=local`
2. Select the `endpoints-skeleton` archetype 
3. Complete requested information

# Deploy archetype

1. Go to folder `target/generated-sources/archetype`
2. Run command `mvn clean deploy` (that will push the archetype to the repo)

# Use of remote archetype

1. You need to have the Slingr repos defined in `~/.m2/settings.xml` (it is referenced above):
  ```
    <profiles>
        <profile>
            <id>slingrRepo</id>
            <activation>
                <property>
                    <name>!doNotUseSlingrRepo</name>
                </property>
            </activation>
            <repositories>
                <repository>
                    <id>slingrRepo.release</id>
                    <url>http://repo.slingrs.io/release</url>
                    <releases>
                      <enabled>true</enabled>
                      <checksumPolicy>fail</checksumPolicy>
                    </releases>
                    <snapshots>
                      <enabled>false</enabled>
                    </snapshots>
                </repository>
                <repository>
                    <id>slingrRepo.snapshot</id>
                    <url>http://repo.slingrs.io/snapshot</url>
                    <releases>
                      <enabled>false</enabled>
                    </releases>
                    <snapshots>
                      <enabled>true</enabled>
                      <checksumPolicy>warn</checksumPolicy>
                    </snapshots>
                </repository>
            </repositories>
        </profile>
    </profiles>
  ```
2. Run command:
  ```
  mvn archetype:generate \
    -DarchetypeGroupId=io.slingr.endpoints.archetypes \
    -DarchetypeArtifactId=endpoint-skeleton-archetype \
    -DarchetypeVersion=1.0-SNAPSHOT \
    -DarchetypeRepository=slingrRepo.snapshot
  ```
3. Complete requested information