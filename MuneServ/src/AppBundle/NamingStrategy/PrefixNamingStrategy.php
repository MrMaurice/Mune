<?php

/*
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * This software consists of voluntary contributions made by many individuals
 * and is licensed under the MIT license. For more information, see
 * <http://www.doctrine-project.org>.
 */

namespace AppBundle\NamingStrategy;
use Doctrine\ORM\Mapping;
/**
 * Naming strategy implementing the underscore naming convention.
 * Converts 'MyEntity' to 'my_entity' or 'MY_ENTITY'.
 *
 *
 * @link    www.doctrine-project.org
 * @since   2.3
 * @author  Fabio B. Silva <fabio.bat.silva@gmail.com>
 */
class PrefixNamingStrategy implements \Doctrine\ORM\Mapping\NamingStrategy
{

    /**
     * @var string
     */
    private $prefix;

    /**
     * Underscore naming strategy construct
     *
     * @param string $prefix
     */
    public function __construct($prefix)
    {

        $this->prefix = $prefix;

    }

    public function classToTableName($className)
    {
       // echo  $this->prefix . substr($className, strrpos($className, '\\') + 1);
        return $this->prefix . substr($className, strrpos($className, '\\') + 1);
    }
    public function propertyToColumnName($propertyName, $className = null)
    {
        return $propertyName;
    }
    public function referenceColumnName()
    {
        return 'id';
    }
    public function joinColumnName($propertyName)
    {
        return $propertyName . '_' . $this->referenceColumnName();
    }
    public function joinTableName($sourceEntity, $targetEntity, $propertyName = null)
    {
        return strtolower($this->classToTableName($sourceEntity) . '_' .
                $this->classToTableName($targetEntity));
    }
    public function joinKeyColumnName($entityName, $referencedColumnName = null)
    {
        return strtolower($this->classToTableName($entityName) . '_' .
                ($referencedColumnName ?: $this->referenceColumnName()));
    }

}
